import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import Movie from '../Movie/Моvie';
import NotFound from '../elements/NotFound/NotFound';
import ActorInfo from '../ActorInfo/ActorInfo';
import TopRated from '../TopRated/TopRated';
import Upcoming from '../Upcoming/Upcoming';


const App = () =>{
    return(
       <BrowserRouter>
       <React.Fragment>
           <Header/>
           <Switch>
               <Route path="/" component={Home} exact />
               <Route path="/popular/:movieId" component={Movie} exact />
               <Route path="/actor/:actorId" component={ActorInfo} exact />
               <Route path="/top-rated" component={TopRated} exact />
               <Route path="/top-rated/:movieId" component={Movie} exact />
               <Route path="/upcoming" component={Upcoming} exact />
               <Route path="/upcoming/:movieId" component={Movie} exact />
              
               <Route component={NotFound} />
           </Switch>
       </React.Fragment>
       </BrowserRouter>
    )
}

export default App;