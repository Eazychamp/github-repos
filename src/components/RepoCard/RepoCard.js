import "./RepoCard.css";

const RepoCard = ({details}) => {
  return (
    <div className="repoCard">
      <div className="cardInner">
        <img
          src={details.owner.avatar_url}
          alt="Person"
          className="card__image"
        />
        <p className="card__name">{details.name}</p>
        <p className="card_details" title={details.description}>{details.description}</p>
        <div className="grid-container">
          <div className="grid-child-posts">Stars - {details.stargazers_count}</div>
          <div className="grid-child-followers">Language - {details.language}</div>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
