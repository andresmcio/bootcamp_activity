module.exports = {
    port: process.env.PORT || 12345,
    callback: (port)=>{console.log('Server listening on port ' + port)}
};