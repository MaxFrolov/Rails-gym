# Set the working application directory
# working_directory "/path/to/your/app"
working_directory "/home/rails/ap-fit/current"

# Unicorn PID file location
# pid "/path/to/pids/unicorn.pid"
pid "/home/rails/ap-fit/current/tmp/pids/unicorn.pid"

# Path to logs
stderr_path "/home/rails/ap-fit/current/log/unicorn.log"
stdout_path "/home/rails/ap-fit/current/log/unicorn.log"

# Unicorn socket
#listen "/tmp/unicorn.[app name].sock"
listen "/home/rails/ap-fit/shared/unicorn.sock"

# Number of processes
# worker_processes 4
worker_processes 2

# Time-out
timeout 30
