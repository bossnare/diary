import { Button } from '@/components/ui/button';
import { AxiosError } from 'axios';
import network_error from '@/assets/network_error.svg';

type NormalizedError = {
  mark: string;
  title: string;
  message: string;
};

const normalizeError = (error: unknown): NormalizedError => {
  if (error instanceof AxiosError) {
    if (!error.response)
      return {
        mark: 'net_err',
        title: 'Network error',
        message: 'Please check your internet connection.',
      };

    const status = error.response?.status;

    if (status === 404)
      return {
        mark: 'not_found',
        title: 'Nothing here yet',
        message: "We couldn't find what you're looking for right now.",
      };

    if (status >= 500)
      return {
        mark: 'server',
        title: 'Server error',
        message:
          'Our services are having a moment. Please try again in a moment.',
      };

    // if 401 &...
    return {
      mark: 'default',
      title: 'Something went wrong',
      message:
        "We couldn't load your data, right now. Please try again in a moment.",
    };
  }

  // if generic Error
  if (error instanceof Error) {
    return {
      mark: 'generic',
      title: 'Something went wrong',
      message: error.message || 'Unexpected error happened',
    };
  }

  //   fallback error
  return {
    mark: 'fallback',
    title: 'Unexpected error',
    message: 'An unknow error occured.',
  };
};

export function ErrorState({
  error,
  onRetry,
}: {
  error: AxiosError;
  onRetry?: () => void;
}) {
  const { mark, title, message } = normalizeError(error);

  return (
    <div className="flex flex-col items-center max-w-lg px-4 gap-4 py-10 mx-auto lg:py-20">
      {mark === 'net_err' && (
        <img
          className="size-40 lg:size-35 dark:invert"
          src={network_error}
          alt={title}
        />
      )}
      <h3 className="text-center font-semibold">{title}</h3>
      <p className="text-muted-foreground lg:text-sm text-center">{message}</p>
      {onRetry && (
        <Button
          onClick={async () => onRetry()}
          className="rounded-full"
          size="lg"
        >
          Refetch
        </Button>
      )}
    </div>
  );
}
