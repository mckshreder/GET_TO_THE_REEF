class GamesController < ApplicationController
	before_action :authorize
  def home
  end

	def level_one
	end

	def level_two
	end

	def save
        user = User.find(params[:user_id].to_i)
        user.scores << Score.create({
          :level1 => params[:level1],
          :level2 => params[:level2],
          :level3 => params[:level3],
          :total => params[:total],   
          :user => params[@user_params]
        })
        user.save
     respond_to do |format|
           format.json { render :json => {:message => "Success"} }
        end
    end

  
  private
    def user_params
        params.require(:user).permit(:name)
    end
end
