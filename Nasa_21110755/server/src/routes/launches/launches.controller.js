const {getAllLaunches, 
        addNewlaunch, 
        exitLaunchId,
        abortLaunchbyId,
    } = require('../../models/launches.models');

function httpAddNewLaunch(req,res) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'missing data'
        }) 
    }

    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'missing data'
         }) 
    }
    addNewlaunch(launch);

    return res.status(201).json(launch);

}
function httpGetAllLaunches(req,res) { 
   
    return res.status(200).json(getAllLaunches());
}

function httpAbortLaunch(req,res) {
    const launchId = Number(req.params.id);
    if(!exitLaunchId(launchId)){
        return res.status(404).json({
            error: ' launch not found',
        })
    }
    
    const aborted = abortLaunchbyId(launchId)
    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
    
}