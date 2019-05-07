import schedule from 'node-schedule';

function job() {
  var j = schedule.scheduleJob('0-59/15 * * * *', function () {
    console.log('Time for tea!');
  })
}

export default job;