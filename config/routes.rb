Rails.application.routes.draw do
  
  root :to => 'games#level_one_video'
    get "/games/home" => "games#home"
    get "/games/landing_page" => "games#landing_page", as: :landing_page
    get "/games/level_one" => "games#level_one", as: :level_one
    get "/games/level_two" => "games#level_two", as: :level_two
    get "/games/level_one_video" => "games#level_one_video", as: :level_one_video
    get "/games/level_two_video" => "games#level_two_video", as: :level_two_video
    get "/games/level_three_video" => "games#level_three_video", as: :level_three_video
    post 'save' => "games#save"



    get "/users" => "users#index", as: :users
    get "/users/new" => "users#new", as: :new_user
    post "/users" => "users#create", as: :create_user
    get "/users/:id" => "users#show", as: :user_profile
    get "users/:id/edit" => "users#edit", as: :edit_users
    patch "users/:id" =>"users#update", as: :update_user
    delete "users/:id" => "users#destroy"



    get "/sessions/new" => "sessions#new", as: :new_session
    post "/sessions" => "sessions#create", as: :create_session
    get "/sessions/destroy" => "sessions#destroy", as: :destroy_session

    # get "/games/home" => "games#home", as: :home

  namespace :api do
    resources :scores, only:[:index]

  end
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
