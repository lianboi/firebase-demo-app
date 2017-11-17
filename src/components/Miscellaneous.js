<p className="App-intro">
          <strong> Your app config is:</strong><br/> {JSON.stringify(config)}
        </p>
        <p> 
          <button onClick={(e) => this.addRoom(e)}>add room</button>
        </p>
        <div className="chat-box">
          <ul>
            { msgs }
          </ul> 
        </div>
        <div>
          <input type="text" value={ this.state.value } onChange={ this.handleChange } ref={(input) => this.inputBox = input } />
          <button onClick={ (e) => this.sendMessage(e) }>send</button>           
        </div>