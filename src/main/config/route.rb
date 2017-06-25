class Route < Sinatra::Base
    get '/' do
        File.read(File.join('src/webapp/', 'index.html'))
    end
end

