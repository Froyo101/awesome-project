Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  
  get 'hello_world', to: 'hello_world#index'
  root to: 'application#index'
  get "app(/*all)", to: "application#index"

  post 'projects', to: 'projects#create'
  get 'projects/:id', to: 'projects#show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
