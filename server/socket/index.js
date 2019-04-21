module.exports = io => {
    io.on('connection', function(socket) {
        console.log('a user connected');
    });
};
