class ApplicationController < ActionController::Base
  include ReactOnRails::Controller
  def index
    redux_store("CoreAppStore")
    #render_html
  end
end
