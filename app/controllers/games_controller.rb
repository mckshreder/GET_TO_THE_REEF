class GamesController < ApplicationController
	before_action :authorize
  def home
  end

  def landing_page
  end

	def level_one
    gon.level = 1
	end

	def level_two
    gon.level = 2
	end

	def save
        user = User.find(params[:user_id].to_i)
        user.scores << Score.create({
          :level1 => params[:level1],
          :level2 => params[:level2],
          :level3 => params[:level3],
          :total => params[:total],
          :name => params[:name],
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
