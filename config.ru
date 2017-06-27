require './main.rb'

use Rack::Static, :urls => ["/css", "/images", "/js"], :root => "public"

run Main