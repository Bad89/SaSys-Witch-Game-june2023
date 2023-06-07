import React from 'react';

// *activated when use StaticRange, e.t.c*
// import { useState, useEffect } from 'react';
import "../../src/Components/AverageKills.css";




const AverageKills = ({ averageKills }) => {
  const isOverTen = averageKills > 10;

  return (
    <div>
      <h2>Average Kills</h2>
      <p>The average number of kills is: {averageKills}</p>
      {isOverTen ? (
        <div className="animation winner">Witch Winner</div>
      ) : (
        <div className="animation lose">Witch Lose</div>
      )}
    </div>
  );
};

export default AverageKills;


// *useless Code*:
// const AverageKills = ({ averageKills }) => {
//   const [animation, setAnimation] = useState('');

//   useEffect(() => {
//     if (averageKills > 10) {
//       setAnimation('coming');
//     } else if (averageKills < 10) {
//       setAnimation('die');
//     }
//   }, [averageKills]);

//   return (
//     <div>
//       <h2>Average Kills</h2>
//       <p>The average number of kills is: {averageKills}</p>
//       {animation === 'coming' && <div className="coming-animation">Coming animation</div>}
//       {animation === 'die' && <div className="die-animation">Die animation</div>}
//     </div>
//   );
// };

// export default AverageKills;



// const AverageKills = ({ averageKills }) => {
//   return (
//     <div>
//       <h2>Average Kills</h2>
//       <p>The average number of kills is: {averageKills}</p>
//     </div>
//   );
// };

// export default AverageKills;
