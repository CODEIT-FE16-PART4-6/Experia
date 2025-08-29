interface ReviewType {
  reviewCount: number;
  rating: number;
}

const PostReview = ({ reviewCount, rating }: ReviewType) => {
  return (
    <div>
      <p>후기</p>
      <div className='flex flex-col'>
        <div className='flex'>
          <div className='flex flex-col'>
            <div>4.2</div>
            <div className='flex flex-col'>
              <div>매우만족</div>
              <div>1300 후기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
