import StarRatings from "./StarRatings";

const CommentBox = () => {
  return (
    <div className="bg-slate-800 mb-10 text-sm w-9/12 text-xs   bg-slate-900 py-4 mt-4 rounded-md  comment-section">
      {/* profile comment  */}
      <div className="flex flex-col ml-5 mr-5 flex-start">
        <div className="flex flex-row items-center justify-between text-pink-100 ">
          <div className="flex flex-row flex-start items-center gap-3">
            <img
              className="ml-1 rounded-full w-12 min-w-12"
              src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
              alt="profile"
            />
            <div>Mostafa rawhy said :</div>
          </div>
          <StarRatings />
        </div>
        <div className="comment-container mb-5 flex flex-row gap-5 text-pink-100">
          The Ramen at DON Eatery was 7/10 as its was super overpriced place but
          if u r willing to pay extra bucks u r good to try it :)
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
