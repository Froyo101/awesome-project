Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  root to: 'application#index'
  get "app(/*all)", to: "application#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
