import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loadBotScript().then(() => {
      this.checkAndApplyStyles(); // Empezar el chequeo de inmediato
    }).catch(error => {
      console.error('Error cargando el script del bot:', error);
    });
  }

  async loadBotScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.src = "https://bots.easy-peasy.ai/chat.min.js";
      // script.setAttribute('data-chat-url', 'https://bots.easy-peasy.ai/bot/a6c6da5b-225a-49cd-92be-801bc3264b51');
      script.setAttribute('data-chat-url', 'https://bots.easy-peasy.ai/bot/535acd64-3076-409b-b15d-f51c78246b69');
      script.setAttribute('data-btn-position', 'bottom-right');
      script.setAttribute('data-widget-btn-color', 'rgba(248, 248, 252, 0)');
      script.setAttribute('data-widget-icon', 'https://gobernaciondecochabamba.bo/storage/uploads/JAKU.png');
      script.defer = true;

      script.onload = () => resolve();
      script.onerror = (error: any) => reject(error);

      this.renderer.appendChild(document.body, script);
    });
  }

  checkAndApplyStyles() {

    let elementoPadre: any;

    const interval = setInterval(() => {
      const widgetIcon = document.querySelector('#dialoq-btn img');
      const divPadre = document.querySelector('#dialoq-btn');
      const mensaje = document.querySelector('#dialoq-message-bubbles');

      elementoPadre = divPadre!.parentElement;


      if (widgetIcon && divPadre) {

        (widgetIcon as HTMLImageElement).style.width = '90px';
        (widgetIcon as HTMLImageElement).style.height = '90px';

        (elementoPadre as HTMLElement).style.bottom = '55px';
        (elementoPadre as HTMLElement).style.right = '55px';

        (mensaje as HTMLElement).style.bottom = '140px';
        (mensaje as HTMLElement).style.right = '20px';

        clearInterval(interval); // Detener el intervalo una vez aplicados los estilos
      }
    }, 100); // Chequear cada 100 ms
  }

}
