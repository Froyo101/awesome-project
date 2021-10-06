Rails.application.config.middleware.insert_before 0, Rack::Cors do
  #allow do
    #origins "http://localhost:3000"
    #resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
  #end

  # PRODUCTION - CHANGE LATER!
  # NEED TO ALLOW MORE ORIGINS IF YOU WANT AUTH TO WORK W/ NON-HTTPS
  allow do
    origins "https://awesome-project-jf.herokuapp.com"
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
  end
end