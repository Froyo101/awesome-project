class ApplicationController < ActionController::Base
  include ReactOnRails::Controller
  skip_before_action :verify_authenticity_token
  
  def index
    redux_store("CoreAppStore")
    #render_html
  end
end
