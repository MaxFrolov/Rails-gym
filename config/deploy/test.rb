# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary server in each group
# is considered to be the first unless any hosts have the primary
# property set.  Don't declare `role :all`, it's a meta role.

role :app, %w{site@46.101.160.118}
role :web, %w{site@46.101.160.118}
role :db,  %w{site@46.101.160.118}

set :rvm_ruby_version, '2.2.3@gym'
set :rvm_type, :user

set :branch, 'development'

set :rails_env, 'production'

set :unicorn_rack_env, 'production'
set :unicorn_config_path, -> { File.join(current_path, "config", "unicorn", "test.rb") }

set :deploy_to, '/home/site/www/site'

set :sidekiq_processes, 3

set :sidekiq_monit_default_hooks, false

# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server definition into the
# server list. The second argument is a, or duck-types, Hash and is
# used to set extended properties on the server.

server '46.101.160.118', user: 'site', roles: %w{web}

# Custom SSH Options
# ==================
# You may pass any option but keep in mind that net/ssh understands a
# limited set of options, consult[net/ssh documentation](http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start).
#
# Global options
# --------------
#  set :ssh_options, {
#    keys: %w(/home/rlisowski/.ssh/id_rsa),
#    forward_agent: false,
#    auth_methods: %w(password)
#  }
#
# And/or per server (overrides global)
# ------------------------------------
# server 'example.com',
#   user: 'user_name',
#   roles: %w{web app},
#   ssh_options: {
#     user: 'user_name', # overrides user setting above
#     keys: %w(/home/user_name/.ssh/id_rsa),
#     forward_agent: false,
#     auth_methods: %w(publickey password)
#     # password: 'please use keys'
#   }