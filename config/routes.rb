Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
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
      resource :foods, only: [:create, :update, :destroy]
      resource :events, only: [:create, :update, :destroy]
      resource :products, only: [:create, :update, :destroy]
    end

    resources :comments, only: [:index, :show]
    resources :posts, only: [:index, :show] do
      get '/recommended_posts', to: 'posts#recommended_posts', on: :collection
    end
    resources :foods, only: [:index, :show] do
      get '/recommended_foods', to: 'foods#recommended_foods', on: :collection
    end
    resources :events, only: [:index, :show]
    resources :products, only: [:index, :show] do
      get '/recommended_products', to: 'products#recommended_products', on: :collection
    end
    resources :ordered_users, only: [:create] do
      resources :orders, only: [:show, :create]
    end
    resources :orders, only: [:destroy] do
      resources :order_items, only: [:create, :update]
    end
  end

  match '/(*path)', via: :all, to: frontend_page('index.htm')
end
