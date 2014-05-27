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
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/govuk/visitors?collect=visitors%3Asum&period=week&duration=1&filter_by=dataType%3Agovuk_visitors")
  response = http.request(req)
  response.body
end

#===========

# Devices last week
get '/govuk-devices' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/govuk/devices?collect=visitors%3Asum&group_by=deviceCategory&duration=1&period=week")
  response = http.request(req)
  response.body
end

#===========

# tax disc realtime visitors
get '/tax-disc-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/tax-disc/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end
# tax disc satisfaction
get '/tax-disc-satisfaction' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/vehicle-licensing/customer-satisfaction?")
  response = http.request(req)
  response.body
end

#===========

# SORN realtime visitors
get '/sorn-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/sorn/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end
# SORN satisfaction
get '/sorn-satisfaction' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/vehicle-licensing/customer-satisfaction?")
  response = http.request(req)
  response.body
end

#===========

# LPA live data
get '/lpa' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/lasting-power-of-attorney/volumes?")
  response = http.request(req)
  response.body
end

#===========

# Carer's allowance live data (returns ALL claims by channel) in a nice format!
get '/carers' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/carers-allowance/weekly-claims?collect=value%3Asum&period=month&group_by=key&duration=12")
  response = http.request(req)
  response.body
end

