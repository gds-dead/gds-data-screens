require 'rubygems'
require 'sinatra'
require 'json'
require 'rack-cache'
require 'net/http'
require 'net/https'
#require 'active_support/core_ext/hash'
#require 'active_support/core_ext/object'

use Rack::Cache
set :public_folder, 'public'
set :bind, '0.0.0.0'

get '/' do
  File.read(File.join('public', 'index.html'))
end

#===========

# Historic visitors
get '/govuk-historic-visitors' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/performance/dashboard/unique-visitors.json")
  response = http.request(req)
  response.body
end

#===========

# tax disc realtime visitors
get '/tax-disc-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/performance/tax-disc/api/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end
# tax disc satisfaction
get '/tax-disc-satisfaction' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/performance/vehicle-licensing/api/customer-satisfaction")
  response = http.request(req)
  response.body
end
