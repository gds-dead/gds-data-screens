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
  req = Net::HTTP::Get.new("/data/govuk/visitors?collect=visitors%3Asum&period=month&duration=1")
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

#===========

# Prison visits over the last 12 months
get '/prison-visits' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/prison-visits/digital-volumes?period=month&group_by=is_digital&collect=count%3Asum&duration=12")
  response = http.request(req)
  response.body
end

#===========

# Civil claims over the last 12 months
get '/civil-claims' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/accelerated-possession-eviction/transactions-by-channel?period=month&group_by=channel&collect=count%3Asum&duration=12")
  response = http.request(req)
  response.body
end

#===========

# Register to vote realtime visitors
get '/register-to-vote-users' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/register-to-vote/realtime?sort_by=_timestamp%3Adescending&limit=5")
  response = http.request(req)
  response.body
end
# Register to vote satisfaction
get '/register-to-vote-satisfaction' do
  cache_control :public, :max_age => 20
  http = Net::HTTP.new('www.performance.service.gov.uk', 443)
  http.use_ssl = true
  req = Net::HTTP::Get.new("/data/register-to-vote/customer-satisfaction?period=day&duration=1&collect=rating_1%3Asum&collect=rating_2%3Asum&collect=rating_3%3Asum&collect=rating_4%3Asum&collect=rating_5%3Asum&collect=total%3Asum")
  response = http.request(req)
  response.body
end

