class RegistrationsController < ApplicationController
  def create
    user = User.create!(
      f_name: params["user"]["f_name"],
      l_name: params["user"]["l_name"],
      username: params["user"]["username"],
      email: params["user"]["email"],
      password: params["user"]["password"],
      password_confirmation: params["user"]["password_confirmation"]
    )

    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        logged_in: true,
        user: user
      }
    else
      render json: { status: 500 }
    end
  end
end