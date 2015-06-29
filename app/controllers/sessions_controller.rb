class SessionsController < ApplicationController
	def new
        @user = User.new
    end

    def create
        user = User.where( email: user_params[:email] ).first
        if user && user.authenticate(user_params[:password])
            session[:user_id] = user.id
            flash["alert-success"] = "Hi #{current_user.name}! You are now logged in."
            redirect_to level_one_video_path
        else
            flash["alert-warning"] = "Incorrect email or password, please try again..."
            redirect_to new_session_path
        end
    end

    def destroy
        session[:user_id] = nil
        flash["alert-success"] = "You have logged out"
        redirect_to new_session_path
    end

private

    def user_params
        params.require(:user).permit(:email, :password)
    end
end
