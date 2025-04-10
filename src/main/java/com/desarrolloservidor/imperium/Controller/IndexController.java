package com.desarrolloservidor.imperium.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class IndexController {

    
    @GetMapping("/")
    public String index(){
        return "index";
    }

    @GetMapping("registro")
    public String registro(){
        return "registro";
    }

    @GetMapping("/juego")
    public String juego () {
        return "juego";
    }

}
