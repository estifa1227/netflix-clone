const Skeleton = ({ className = '' }) => (
  <div
    className={`skeleton bg-gradient-to-r from-dark-lighter via-dark-card to-dark-lighter bg-[length:200%_100%] animate-shimmer rounded-lg ${className}`}
  />
);

export const MovieCardSkeleton = () => (
  <div className="flex-shrink-0 w-[200px] sm:w-[220px]">
    <Skeleton className="aspect-[2/3] w-full rounded-lg" />
    <div className="mt-3 space-y-2 px-1">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
);

export const MovieRowSkeleton = () => (
  <div className="mb-10">
    <Skeleton className="h-7 w-48 mb-5 ml-16" />
    <div className="flex gap-2 px-16">
      {Array.from({ length: 7 }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export const MovieDetailSkeleton = () => (
  <div className="bg-dark min-h-screen pt-20">
    <Skeleton className="w-full h-[60vh] rounded-none" />
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 -mt-40 relative z-10">
      <div className="flex flex-col md:flex-row gap-8">
        <Skeleton className="w-48 sm:w-64 aspect-[2/3] rounded-xl flex-shrink-0" />
        <div className="flex-1 pt-4 space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const SearchSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i}>
        <Skeleton className="aspect-[2/3] w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </div>
    ))}
  </div>
);

export const ProfileSkeleton = () => (
  <div className="bg-dark min-h-screen pt-24">
    <div className="max-w-2xl mx-auto px-4">
      <Skeleton className="h-10 w-48 mb-8" />
      <div className="rounded-2xl p-8 bg-dark-lighter space-y-6">
        <div className="flex items-center gap-6">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
        </div>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  </div>
);

export default Skeleton;
