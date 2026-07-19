import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useAsync } from "./useAsync";

// useAsync는 6개 이상의 페이지 훅(useHomeData, useSummary, useGmailAccounts 등)이
// 공통으로 의존하는 기반 훅이라, 여기가 깨지면 앱 전반의 데이터 로딩이 조용히 깨진다.
describe("useAsync", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("resolves fetcher result and sets status to ready", async () => {
    const fetcher = vi.fn().mockResolvedValue({ hello: "world" });
    const { result } = renderHook(() => useAsync(fetcher));

    expect(result.current.status).toBe("loading");

    await waitFor(() => expect(result.current.status).toBe("ready"));
    expect(result.current.data).toEqual({ hello: "world" });
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("sets status to error when fetcher rejects", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const fetcher = vi.fn().mockRejectedValue(new Error("boom"));
    const { result } = renderHook(() => useAsync(fetcher));

    await waitFor(() => expect(result.current.status).toBe("error"));
    expect(result.current.data).toBeNull();
  });

  it("uses the given initialValue while loading", () => {
    const fetcher = vi.fn().mockResolvedValue([]);
    const { result } = renderHook(() => useAsync(fetcher, []));

    expect(result.current.data).toEqual([]);
  });

  it("reload() re-invokes the fetcher and replaces data", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce("first")
      .mockResolvedValueOnce("second");
    const { result } = renderHook(() => useAsync(fetcher));

    await waitFor(() => expect(result.current.status).toBe("ready"));
    expect(result.current.data).toBe("first");

    await act(async () => {
      await result.current.reload();
    });

    expect(result.current.data).toBe("second");
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
