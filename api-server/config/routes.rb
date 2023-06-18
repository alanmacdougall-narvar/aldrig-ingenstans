Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # basic hello world route, returns JSON message
  get '/hello_world', to: 'hello_world#index'

  resources :dogs
end
