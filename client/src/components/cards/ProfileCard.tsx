interface ProfilePropsType {
  username: string;
}

function ProfileCard({ username }: ProfilePropsType) {
  return (
    <section className='px-2'>
      <div className='card bg-base-100 w-auto shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title capitalize'>{username}</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className='card-actions justify-end'>
            <button className='btn btn-primary'>Buy Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProfileCard;
