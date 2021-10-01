Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  
  root to: 'application#index'
  get "app(/*all)", to: "application#index"

  post 'projects', to: 'projects#create'
  get 'projects/all', to: 'projects#show_all'
  get 'projects/:id', to: 'projects#show'
  patch 'projects/:id', to: 'projects#update'
  delete 'projects/:id', to: 'projects#destroy'

  get '*all', to: "application#index"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
