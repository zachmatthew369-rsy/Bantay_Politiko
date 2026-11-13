import { useState, useEffect, useCallback, useRef } from 'react';
import { Politician } from '../types';

export type VoteChoice = 'corrupt' | 'not_corrupt' | 'undecided';

export interface CitizenFeedbackItem {
  id: string;
  politicianId: string;
  politicianName: string;
  sentiment: 'supportive' | 'concerned' | 'undecided';
  comment: string;
  timestamp: string;
  receiptCode: string;
}

export interface VoterChallenge {
  challengeId: string;
  question: string;
  expiresAt: number;
  signature: string;
}

export interface PendingVoteRequest {
  politician: Politician;
  voteType: VoteChoice;
  comment?: string;
}

export interface UserVoteReceipt {
  voteType: VoteChoice;
  votedAt: string;
}

function getOrCreateDeviceFingerprint(): string {
  try {
    let devId = localStorage.getItem('bp_civic_device_id');
    if (!devId) {
      devId =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `dev-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem('bp_civic_device_id', devId);
    }
    const raw = [
      devId,
      navigator.userAgent || '',
      navigator.language || '',
      Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      `${screen.width}x${screen.height}`,
      String(navigator.hardwareConcurrency || 0)
    ].join('|');

    let hash = 2166136261;
    for (let i = 0; i < raw.length; i++) {
      hash ^= raw.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `fp_${(hash >>> 0).toString(16)}_${devId.slice(0, 8)}`;
  } catch {
    return 'fp_fallback_session';
  }
}

export function useSentimentStream(onToast?: (msg: string) => void) {
  const [sentimentByPolitician, setSentimentByPolitician] = useState<
    Record<string, Politician['sentiment']>
  >({});
  const [userVotesByPolitician, setUserVotesByPolitician] = useState<
    Record<string, UserVoteReceipt>
  >({});
  const [totalGlobalVotes, setTotalGlobalVotes] = useState<number>(0);
  const [feedbackLog, setFeedbackLog] = useState<CitizenFeedbackItem[]>([]);
  const [gateVerified, setGateVerified] = useState<boolean>(false);
  const [gateToken, setGateToken] = useState<string>(() => {
    try {
      return sessionStorage.getItem('bp_gate_token') || '';
    } catch {
      return '';
    }
  });
  const [isStreamConnected, setIsStreamConnected] = useState<boolean>(false);
  const [isGateModalOpen, setIsGateModalOpen] = useState<boolean>(false);
  const [pendingVote, setPendingVote] = useState<PendingVoteRequest | null>(null);
  const [challenge, setChallenge] = useState<VoterChallenge | null>(null);
  const [gateError, setGateError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fingerprintRef = useRef<string>('');
  if (!fingerprintRef.current && typeof window !== 'undefined') {
    fingerprintRef.current = getOrCreateDeviceFingerprint();
  }

  const refreshSession = useCallback(async (tokenOverride?: string) => {
    try {
      const tok = tokenOverride ?? gateToken;
      const headers: Record<string, string> = {
        'x-client-fingerprint': fingerprintRef.current
      };
      if (tok) headers['x-voter-gate-token'] = tok;

      const res = await fetch('/api/sentiment/session', { headers });
      if (!res.ok) return;
      const data = await res.json();
      setGateVerified(Boolean(data.gateVerified));
      if (data.voterVotes && typeof data.voterVotes === 'object') {
        setUserVotesByPolitician(data.voterVotes);
      }
      if (typeof data.totalGlobalVotes === 'number') {
        setTotalGlobalVotes(data.totalGlobalVotes);
      }
    } catch (err) {
      console.error('Failed to sync voter session:', err);
    }
  }, [gateToken]);

  // Hydrate initial session & subscribe to SSE stream
  useEffect(() => {
    refreshSession();

    const source = new EventSource('/api/sentiment/stream');

    source.onopen = () => {
      setIsStreamConnected(true);
    };

    source.addEventListener('sentiment:init', (evt) => {
      try {
        const data = JSON.parse((evt as MessageEvent).data);
        if (data.sentiments && typeof data.sentiments === 'object') {
          setSentimentByPolitician(data.sentiments);
        }
        if (typeof data.totalGlobalVotes === 'number') {
          setTotalGlobalVotes(data.totalGlobalVotes);
        }
        if (Array.isArray(data.feedbackLog)) {
          setFeedbackLog(data.feedbackLog);
        }
        setIsStreamConnected(true);
      } catch (err) {
        console.error('Failed to parse sentiment:init event:', err);
      }
    });

    source.addEventListener('sentiment:updated', (evt) => {
      try {
        const data = JSON.parse((evt as MessageEvent).data);
        if (data.politicianId && data.sentiment) {
          setSentimentByPolitician((prev) => ({
            ...prev,
            [data.politicianId]: data.sentiment
          }));
        }
        if (typeof data.totalGlobalVotes === 'number') {
          setTotalGlobalVotes(data.totalGlobalVotes);
        }
        if (data.latestFeedback) {
          setFeedbackLog((prev) => {
            if (prev.some((item) => item.id === data.latestFeedback.id)) return prev;
            return [data.latestFeedback, ...prev].slice(0, 100);
          });
        }
      } catch (err) {
        console.error('Failed to parse sentiment:updated event:', err);
      }
    });

    source.onerror = () => {
      setIsStreamConnected(false);
    };

    return () => {
      source.close();
      setIsStreamConnected(false);
    };
  }, [refreshSession]);

  const fetchChallenge = useCallback(async () => {
    setGateError(null);
    try {
      const res = await fetch('/api/sentiment/challenge');
      if (!res.ok) throw new Error('Unable to load security challenge');
      const data: VoterChallenge = await res.json();
      setChallenge(data);
    } catch {
      setGateError('Could not load security challenge. Please retry.');
    }
  }, []);

  const executeVote = useCallback(
    async (
      politician: Politician,
      voteType: VoteChoice,
      comment?: string,
      tokenOverride?: string
    ): Promise<boolean> => {
      const tok = tokenOverride ?? gateToken;
      setIsSubmitting(true);
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'x-client-fingerprint': fingerprintRef.current
        };
        if (tok) headers['x-voter-gate-token'] = tok;

        const res = await fetch('/api/sentiment/vote', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            politicianId: politician.id,
            voteType,
            comment: comment?.trim() || undefined,
            clientFingerprint: fingerprintRef.current,
            gateToken: tok || undefined
          })
        });

        const data = await res.json();

        if (res.status === 403 && data?.error === 'SECURITY_GATE_REQUIRED') {
          setGateVerified(false);
          setPendingVote({ politician, voteType, comment });
          await fetchChallenge();
          setIsGateModalOpen(true);
          return false;
        }

        if (res.status === 409 && data?.error === 'ALREADY_VOTED') {
          setUserVotesByPolitician((prev) => ({
            ...prev,
            [politician.id]: {
              voteType: data.existingVote || voteType,
              votedAt: data.votedAt || new Date().toISOString()
            }
          }));
          if (data.sentiment) {
            setSentimentByPolitician((prev) => ({
              ...prev,
              [politician.id]: data.sentiment
            }));
          }
          onToast?.(
            `Single-Vote Fairness Lock: You already submitted your verified sentiment for ${politician.name}.`
          );
          return false;
        }

        if (!res.ok) {
          onToast?.(data?.error || 'Could not record vote. Please try again.');
          return false;
        }

        if (data.sentiment) {
          setSentimentByPolitician((prev) => ({
            ...prev,
            [politician.id]: data.sentiment
          }));
        }
        if (typeof data.totalGlobalVotes === 'number') {
          setTotalGlobalVotes(data.totalGlobalVotes);
        }
        if (data.latestFeedback) {
          setFeedbackLog((prev) => {
            if (prev.some((item) => item.id === data.latestFeedback.id)) return prev;
            return [data.latestFeedback, ...prev].slice(0, 100);
          });
        }
        setUserVotesByPolitician((prev) => ({
          ...prev,
          [politician.id]: {
            voteType,
            votedAt: data.votedAt || new Date().toISOString()
          }
        }));

        onToast?.(
          voteType === 'corrupt'
            ? `Verified misconduct concern recorded live for ${politician.name} (1-vote lock active).`
            : voteType === 'not_corrupt'
            ? `Verified service support recorded live for ${politician.name} (1-vote lock active).`
            : `Verified undecided sentiment recorded live for ${politician.name}.`
        );
        return true;
      } catch (err) {
        console.error('Vote submission failed:', err);
        onToast?.('Network error recording vote. Please try again.');
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [gateToken, fetchChallenge, onToast]
  );

  const castVote = useCallback(
    async (politician: Politician, voteType: VoteChoice, comment?: string): Promise<boolean> => {
      if (userVotesByPolitician[politician.id]) {
        onToast?.(
          `Fairness Lock: You already cast your single vote for ${politician.name}.`
        );
        return false;
      }

      if (!gateVerified) {
        setPendingVote({ politician, voteType, comment });
        await fetchChallenge();
        setIsGateModalOpen(true);
        return false;
      }

      return executeVote(politician, voteType, comment);
    },
    [userVotesByPolitician, gateVerified, fetchChallenge, executeVote, onToast]
  );

  const verifyGateAndCompleteVote = useCallback(
    async (answer: string, pledgeAccepted: boolean) => {
      if (!challenge) return false;
      setGateError(null);
      setIsSubmitting(true);
      try {
        const res = await fetch('/api/sentiment/verify-gate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            challengeId: challenge.challengeId,
            answer: answer.trim(),
            expiresAt: challenge.expiresAt,
            signature: challenge.signature,
            pledgeAccepted
          })
        });
        const data = await res.json();
        if (!res.ok) {
          setGateError(data?.error || 'Verification failed. Please check your answer.');
          await fetchChallenge();
          return false;
        }

        const newToken = data.gateToken || '';
        setGateVerified(true);
        setGateToken(newToken);
        try {
          if (newToken) sessionStorage.setItem('bp_gate_token', newToken);
        } catch {
          // ignore storage quota errors
        }

        await refreshSession(newToken);
        setIsGateModalOpen(false);

        if (pendingVote) {
          const toSend = pendingVote;
          setPendingVote(null);
          await executeVote(toSend.politician, toSend.voteType, toSend.comment, newToken);
        }
        return true;
      } catch {
        setGateError('Network error during verification. Please retry.');
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [challenge, fetchChallenge, refreshSession, pendingVote, executeVote]
  );

  const closeGateModal = useCallback(() => {
    setIsGateModalOpen(false);
    setPendingVote(null);
    setGateError(null);
  }, []);

  const getLiveSentiment = useCallback(
    (pol: Politician): Politician['sentiment'] => {
      return sentimentByPolitician[pol.id] || {
        corruptVotes: 0,
        notCorruptVotes: 0,
        undecidedVotes: 0,
        supportivePercent: 0,
        concernedPercent: 0,
        undecidedPercent: 0,
        totalResponses: 0,
        lastUpdated: 'No votes yet',
        history: []
      };
    },
    [sentimentByPolitician]
  );

  return {
    sentimentByPolitician,
    userVotesByPolitician,
    totalGlobalVotes,
    feedbackLog,
    gateVerified,
    isStreamConnected,
    isGateModalOpen,
    pendingVote,
    challenge,
    gateError,
    isSubmitting,
    castVote,
    verifyGateAndCompleteVote,
    fetchChallenge,
    closeGateModal,
    getLiveSentiment
  };
}
