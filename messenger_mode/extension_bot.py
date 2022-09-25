import time
import random
from pynput.keyboard import Key, Controller
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager

class ExtensionBot():
    def __init__(self, username, password, contact_name, message) -> None:
        self.driver = webdriver.Chrome(ChromeDriverManager().install())
        self.driver.maximize_window()
        self.driver.get("https://www.messenger.com/")
        self.actions = ActionChains(self.driver)
        self.keyboard = Controller()
        self.wait_time = 10
        self.message = message
        
        # Actions
        self.login(username, password)
        self.find_contact(contact_name)
        self.talk_with_contact()
        
        print("Message Sent!")
    
    def login(self, username, password):
        email_box = WebDriverWait(self.driver, self.wait_time).until(EC.presence_of_element_located((By.ID, "email")))
        pass_box = WebDriverWait(self.driver, self.wait_time).until(EC.presence_of_element_located((By.ID, "pass")))
        login_btn = WebDriverWait(self.driver, self.wait_time).until(EC.presence_of_element_located((By.ID, "loginbutton")))
        
        self.driver.execute_script("arguments[0].scrollIntoView(true);", login_btn)
        
        time.sleep(0.5)
        email_box.send_keys(username)
        pass_box.send_keys(password)
        login_btn.click()
        
    def find_contact(self, contact_name):
        search_box = WebDriverWait(self.driver, self.wait_time).until(EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Search Messenger']")))
        search_box.send_keys(contact_name)
        
        search_results = WebDriverWait(self.driver, self.wait_time).until(EC.presence_of_element_located((By.XPATH, "//ul[@role='listbox']")))
        contact_list = search_results.find_elements_by_tag_name("li")[0]
        contact_btn = contact_list.find_elements_by_tag_name("li")[1]
        contact_btn.click()
    
    def talk_with_contact(self):
        initial_chat_box = WebDriverWait(self.driver, self.wait_time).until(EC.presence_of_element_located((By.XPATH, "//div[text()='Aa']")))
        self.actions.move_to_element(initial_chat_box).click().perform()
        
        for char in self.message:
            self.keyboard.type(char)
            time.sleep(random.random() / 4)
        
        time.sleep(2)
        with self.keyboard.pressed(Key.ctrl):
            self.keyboard.tap('a')
        
        time.sleep(0.5)
        self.keyboard.tap(Key.backspace)
        
        for char in "I don't think we should be friends anymore.":
            self.keyboard.type(char)
            time.sleep(random.random() / 10)

        self.keyboard.press(Key.enter)
        time.sleep(2)
