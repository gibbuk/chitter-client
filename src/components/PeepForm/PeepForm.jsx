import axios from "axios";
import { useState } from "react";

const PeepForm = ({ user, getPeeps, signOut }) => {
  const [peepContent, setPeepContent] = useState(``);

  const handleChange = (e) => {
    setPeepContent(e.target.value);
  };

  const postPeep = async (e) => {
    e.preventDefault();
    const peep = {
      username: user.username,
      realName: user.name,
      content: peepContent,
      dateCreated: new Date().toISOString(),
    };

    try {
      const res = await axios.post(`http://localhost:4000/peeps`, {
        user: user,
        peep: peep,
      });
      if (res.data.peep) {
        getPeeps();
      }
      alert(res.data.message);
    } catch (error) {
      alert(error.message);
    }
    setPeepContent(``);
  };

  return (
    <aside className="col">
      <div className="card mb-4 rounded-3 shadow-sm">
        <div className="card-header py-3">
          <h1 className="my-0 fw-normal">Post a peep!</h1>
        </div>
        <div className="card-body">
          <form className="container d-grid gap-3" onSubmit={postPeep}>
            <div className="row">
              <label htmlFor="peepContent"></label>
              <textarea
                id="peepContent"
                name="peepContent"
                maxLength="280"
                rows={5}
                value={peepContent}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="row">
              <input
                type="submit"
                value="Peep!"
                className="w-50 btn btn-lg btn-outline-primary mx-auto"
              />
            </div>
          </form>
          <form className="container d-grid gap-3" onClick={signOut}>
            <div className="row ">
              <h2 className="mt-5 mb-0 text-center">Finished?</h2>
            </div>
            <div className="row">
              <input
                type="button"
                value="Sign out"
                className="w-50 btn btn-lg btn-outline-primary mx-auto"
              />
            </div>
          </form>
        </div>
      </div>
    </aside>
  );
};

export default PeepForm;
