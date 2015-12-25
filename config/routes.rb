Rails.application.routes.draw do
  scope :api do
    devise_for :users, skip: :all, failure_app: CustomAuthFailure

    devise_scope :user do
      post    'login', to: 'jwt_authentication/sessions#create'
      post    'registration', to: 'jwt_authentication/registrations#create'
      post    'passwords', to: 'jwt_authentication/passwords#create'
      match   'passwords', to: 'jwt_authentication/passwords#update', via: [:patch, :put]
      get     'confirmation', to: 'jwt_authentication/confirmations#show'
      post    'resend_confirmation', to: 'jwt_authentication/confirmations#create'
    end

    resources :users, only: [:show, :update, :index, :destroy] do
      resource :comments, only: [:create, :update]
      resource :posts, only: [:create, :update, :destroy]
      resource :diet_advices, only: [:create, :update, :destroy]
    end

    resources :comments, only: [:index, :show]
    resources :posts, only: [:index, :show] do
      get '/recommended_posts', to: 'posts#recommended_posts', on: :collection
    end
    resources :diet_advices, only: [:index, :show]
  end

  match '/(*path)', via: :all, to: frontend_page('index.htm')
end
