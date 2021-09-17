class ProjectsController < ApplicationController
  include CurrentUserConcern
  before_action :logged_in
  before_action :set_project, only: [:show]
  before_action :correct_user, only: [:update, :destroy]

  def create
    project = @current_user.projects.build(
      title: params["project"]["title"],
      owner: @current_user.username,
      content: params["project"]["content"],
      public: params["project"]["public"]
    )

    if project.save
      render json: {
        status: :created,
        project: project,
      }
    else
      render json: {
        status: 500
      }
  end

  def show
    if project && project.public
      render json: {
        project_loaded: true,
        project: project
      }
    elsif project && !project.public
      correct_user
      if project
        render json: {
          project_loaded: true,
          project: project
        }
      else
        render json: {
          status: 401,
          project_loaded: false
        }
      end
    else
      render json: {
        status: 404,
        project_loaded: false
      }
    end
  end

  def update
  end

  def destroy
  end

  private
    def logged_in
      if @current_user.nil?
        render json: { status: 401 }
      end
    end

    def set_project
      project = Project.find(params[:id])
    end

    def correct_user
      project = @current_user.projects.find_by(id: params[:id])
    end
end
