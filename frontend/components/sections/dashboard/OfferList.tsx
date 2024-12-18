import { Post } from '@/libs/types/post.type';

type Props = {
  offerList: Post[];
  onAction: (petitionId: number, status: 'Accepted' | 'Decline') => void;
};

export default function OfferList({ offerList, onAction }: Props) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Offer List - Petitions to Fund
      </h2>
      <div className="space-y-4">
        {offerList.length > 0 ? (
          offerList.map((petition: Post) => (
            <div
              key={petition.id}
              className="flex items-center justify-between rounded-lg bg-white p-6 shadow-md"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {petition.title}
                </h3>
                <p className="mt-1 text-gray-600">{petition.desc}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Upvotes: {petition.upvotes.length}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onAction(petition.id, 'Accepted')}
                  className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => onAction(petition.id, 'Decline')}
                  className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No petitions available to fund.</p>
        )}
      </div>
    </section>
  );
}
