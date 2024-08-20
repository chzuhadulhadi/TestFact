import { useNavigate } from "react-router-dom";
import "./listing.css";
function AddNewListing() {
  const navigate = useNavigate();
  return (
    <div class="userlist">
      <div class="mainsection">
        <div className="Pricing_sec" id="pricing">
          <div class="Center">
            <h2>Create listings</h2>
            <div class="Line"></div>

            <div className="formcontainer">
              <form className="userform">
                <input
                  type="text"
                  placeholder="Name of listing..."
                  className="formField"
                  required
                />

                <textarea
                  placeholder="details for listing..."
                  className="formField"
                  required
                />

                <button
                  type="submit"
                  className="button"
                  onClick={() => {
                    navigate("/addusersinlisting");
                  }}
                >
                  {" "}
                  Create Listing{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddNewListing;
