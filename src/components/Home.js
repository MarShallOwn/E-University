import React, { useEffect } from "react";
import _ from "lodash";
import { Grid } from "@material-ui/core";
import { useUser } from "../contexts/UserProvider";
import "./styleHome.css";

const Home = () => {
  const user = useUser();

  return (
    <Grid >
      {!_.isEmpty(user.email) && (
        <p>
          Welcome {user.isProf && "Dr. "} {user.firstname} {user.lastname}
        </p>
      )}
      Home Page
      <Grid>
        <ul class="timeline">
          <li>
            <div class="direction-l">
              <div class="flag-wrapper">
                <span class="flag">Your National ID</span>
				<span id="one" className="num-left">1</span>
              </div>
              <div class="desc">
                click your National ID in navigation bar to insert your National
                ID
              </div>
            </div>
          </li>

          <li>
            <div class="direction-r">
              <div class="flag-wrapper">
                <span class="flag">Write Your National ID</span>
				<span id="two" className="num-right">2</span>
              </div>
              <div class="desc">
                Click your code in navigation bar to insert your National ID
              </div>
            </div>
          </li>

          <li>
            <div id="" class="direction-l">
              <div class="flag-wrapper">
                <span class="flag">Register</span>
				<span id="three" className="num-left">3</span>
              </div>
              <div class="desc">
                Click your code in navigation bar to insert your National ID
              </div>
            </div>
          </li>

          <li>
            <div class="direction-r">
              <div class="flag-wrapper">
                <span class="flag">Login</span>
				<span id="four" className="num-right">4</span>
              </div>
              <div class="desc">
                Click your code in navigation bar to insert your National ID
              </div>
            </div>
          </li>

          <li>
            <div class="direction-l">
              <div class="flag-wrapper">
                <span class="flag">Your Profile</span>
				<span id="five" className="num-left">5</span>
              </div>
              <div class="desc">
                My first employer. All the stuff I've learned and projects I've
                been working on.
              </div>
            </div>
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default Home;

/*

*/
