import "./App.css";
import Navbar from "./components/Navbar";
import Newpost from "./components/Newpost";
import Test from "./components/Test";

function App() {
  return (
    <div>
      <Newpost />
      {/* <Test></Test> */}
      {/* <Navbar />
      <div className="newPostCard">
        <div className="adddPost">
          <img
            src="https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="avatar"
          />
          <div className="postForm">
            <input
              type="text"
              placeholder="What's in ur mind?"
              className="postInput"
            />
            <label htmlFor="file"></label>
            <input id="file" style={{ display: "none" }} type="file" />
            <button>Send</button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default App;
