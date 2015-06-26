class UsersController < ApplicationController
	def index
        @users = User.all
        respond_to do |format|    
            format.html { render :index }
            format.json { render json: @users }
        end
    end

    def new
        @user = User.new
    end
    
    def show
        @user = User.find(params[:id])
        
        respond_to do |format|    
            format.html { render :show }
            format.json { render json: @user }
        end
 
    end

    def create
        @user = User.new(user_params)

        respond_to do |format|
      if @user.save


        format.html { redirect_to level_one_path, notice: 'User was successfully created. Please sign in below.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end

    end

    def edit 
        @user = User.find(params[:id])
        respond_to do |format|    
            format.html { render :edit }
            format.json { render json: @user }
        end
    end

    def update
        @user = User.find(params[:id])
        if @user.update_attributes(params.require(:user).permit(:name, :email, :password, :password_confirmation))
            redirect_to users_path
        
            respond_to do |format|    
                format.html { render :show }
                format.json { render json: @user }
            end

        else 
            render :edit
        end
    end

    def destroy
        @user.destroy
        respond_to do |format|
        format.html { redirect_to users_path, notice: 'User was successfully destroyed.' }
        format.json { head :no_content }
        end
       
    end

private

    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end

end

