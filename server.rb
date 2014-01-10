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

# Visitors narrative
get '/govuk-visitors-narrative' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.gov.uk', 443)
  http.use_ssl = true
  #req = Net::HTTP::Get.new("/performance/dashboard/narrative.json")
  req = Net::HTTP::Get.new("/performance/dashboard/narrative")
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

#===========

# SORN realtime visitors
get '/sorn-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/performance/sorn/api/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end
# SORN satisfaction
get '/sorn-satisfaction' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/performance/vehicle-licensing/api/customer-satisfaction")
  response = http.request(req)
  response.body
end

#===========

# LPA live data
get '/lpa' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/performance/lasting-power-of-attorney/api/volumes?")
  response = http.request(req)
  response.body
end