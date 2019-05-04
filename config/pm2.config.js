const config = require('../package.json');
require('./env.config.js');

module.exports = {
    name: config.name,
    script: 'index.js',
    exec_mode: 'fork',
    node_args: '--harmony --trace-deprecation --max_old_space_size=512 -r esm',
    args: '--color',
    max_memory_restart: '512M',
    max_restarts: 3,
    restart_delay: 3000,
    min_uptime: 3000,
    log_file: 'logs/output.log',
    watch: ['package.json', 'index.js', 'config/', 'api/', 'models/'],
};