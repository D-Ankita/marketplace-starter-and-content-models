import "./style.scss";
import { ReactComponent as AttentionLogo } from "../../assets/Attention.svg";

export const UnauthorizedCard = () => {
  return (
    <div className="UnauthorizedCard">
      <AttentionLogo />
      <p className="ErrorMessage">
        <span>
          Error 401: Unauthorized Error <br />
        </span>
        You are unauthorised to make this request.
      </p>
    </div>
  );
};
