@dir = File.expand_path('../', __FILE__)

worker_processes 1
working_directory @dir

timeout 300
listen 9090

pid "#{@dir}/tmp/pids/unicorn.pid"

stderr_path "#{@dir}/log/unicorn.stderr.log"
stdout_path "#{@dir}/log/unicorn.stdout.log"

print "Server is Running... \nPlease access http://localhost:9090\n"