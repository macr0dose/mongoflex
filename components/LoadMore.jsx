import Button from './Button';

const LoadMore = ({ loadMore }) => {
  return (
    <div className="w-full flex justify-center mt-10">
      <Button title="Load More" handleClick={loadMore} />
    </div>
  );
};

export default LoadMore;