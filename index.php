<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecureChat - End-to-End Encrypted Messenger</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div id="app">
        <!-- Loading Screen -->
        <div id="loading" class="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center z-50">
            <div class="text-center text-white">
                <div class="bg-white/20 p-4 rounded-2xl inline-block mb-4">
                    <i class="fas fa-shield-alt text-4xl"></i>
                </div>
                <h1 class="text-2xl font-bold mb-2">SecureChat</h1>
                <p class="text-indigo-100">End-to-End Encrypted Messaging</p>
                <div class="mt-4">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                </div>
            </div>
        </div>

        <!-- Auth Screen -->
        <div id="auth-screen" class="hidden min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
            <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
                <!-- Auth Header -->
                <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white text-center">
                    <div class="bg-white/20 p-4 rounded-2xl inline-block mb-4">
                        <i class="fas fa-shield-alt text-4xl"></i>
                    </div>
                    <h1 class="text-2xl font-bold mb-2">SecureChat</h1>
                    <p class="text-indigo-100">End-to-End Encrypted Messaging</p>
                </div>

                <!-- Auth Form -->
                <div class="p-8">
                    <div class="text-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-2" id="auth-title">Welcome Back</h2>
                        <p class="text-gray-600" id="auth-subtitle">Sign in to continue messaging securely</p>
                    </div>

                    <form id="auth-form" class="space-y-6">
                        <!-- Name Field (for registration) -->
                        <div id="name-field" class="hidden">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <div class="relative">
                                <input type="text" id="name" placeholder="Enter your full name" 
                                       class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                <i class="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                        </div>

                        <!-- Email Field -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div class="relative">
                                <input type="email" id="email" placeholder="Enter your email" required
                                       class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                <i class="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                        </div>

                        <!-- Password Field -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div class="relative">
                                <input type="password" id="password" placeholder="Enter your password" required
                                       class="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                <i class="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <button type="button" id="toggle-password" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>

                        <button type="submit" id="auth-submit" 
                                class="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                            <i class="fas fa-comments"></i>
                            <span>Sign In</span>
                        </button>
                    </form>

                    <div class="mt-6 text-center">
                        <p class="text-sm text-gray-600">
                            <span id="auth-switch-text">Don't have an account?</span>
                            <button id="auth-switch" class="text-indigo-600 hover:text-indigo-700 font-medium ml-1">
                                Sign up here
                            </button>
                        </p>
                    </div>

                    <!-- Security Features -->
                    <div class="mt-8 p-4 bg-green-50 rounded-2xl">
                        <h4 class="font-semibold text-green-900 mb-2 flex items-center">
                            <i class="fas fa-shield-alt mr-2"></i>
                            Security Features
                        </h4>
                        <ul class="text-sm text-green-800 space-y-1">
                            <li>• End-to-end encryption for all messages</li>
                            <li>• Secure voice and video calls</li>
                            <li>• No message storage on servers</li>
                            <li>• Perfect forward secrecy</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main App -->
        <div id="main-app" class="hidden min-h-screen bg-gray-50">
            <!-- Header -->
            <header class="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <div class="flex items-center space-x-3">
                            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-xl">
                                <i class="fas fa-shield-alt text-white"></i>
                            </div>
                            <div>
                                <h1 class="text-xl font-bold text-gray-900">SecureChat</h1>
                                <p class="text-xs text-gray-600">End-to-End Encrypted</p>
                            </div>
                        </div>

                        <!-- Navigation -->
                        <nav class="flex items-center space-x-1">
                            <button id="nav-chats" class="nav-btn active p-2 rounded-lg transition-colors">
                                <i class="fas fa-comments"></i>
                            </button>
                            <button id="nav-groups" class="nav-btn p-2 rounded-lg transition-colors">
                                <i class="fas fa-users"></i>
                            </button>
                            <button id="nav-settings" class="nav-btn p-2 rounded-lg transition-colors">
                                <i class="fas fa-cog"></i>
                            </button>
                        </nav>

                        <!-- User Info -->
                        <div class="flex items-center space-x-3">
                            <div class="text-right hidden sm:block">
                                <p class="text-sm font-medium text-gray-900" id="user-name">User</p>
                                <p class="text-xs text-gray-600">Online</p>
                            </div>
                            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-full">
                                <span class="text-white font-semibold text-sm" id="user-avatar">U</span>
                            </div>
                            <button id="logout-btn" class="text-gray-600 hover:text-red-600 p-2 rounded-lg">
                                <i class="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Main Content -->
            <main class="pt-16 flex h-screen">
                <!-- Sidebar -->
                <div class="w-1/3 border-r border-gray-200 bg-white">
                    <!-- Chat List View -->
                    <div id="chat-list-view" class="h-full flex flex-col">
                        <!-- Chat List Header -->
                        <div class="p-4 border-b border-gray-200">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-xl font-bold text-gray-900">Chats</h2>
                                <button id="new-chat-btn" class="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            
                            <!-- Search -->
                            <div class="relative">
                                <input type="text" id="chat-search" placeholder="Search chats..." 
                                       class="w-full px-4 py-3 pl-10 bg-gray-100 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                        </div>

                        <!-- Chat List -->
                        <div id="chat-list" class="flex-1 overflow-y-auto">
                            <!-- Chat items will be populated here -->
                        </div>
                    </div>

                    <!-- Group Manager View -->
                    <div id="group-manager-view" class="hidden h-full flex flex-col">
                        <div class="p-4 border-b border-gray-200">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-xl font-bold text-gray-900">Groups</h2>
                                <button id="new-group-btn" class="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="flex-1 p-4">
                            <p class="text-gray-600 text-center">No groups yet. Create your first group!</p>
                        </div>
                    </div>

                    <!-- Settings View -->
                    <div id="settings-view" class="hidden h-full flex flex-col">
                        <div class="p-4 border-b border-gray-200">
                            <h2 class="text-xl font-bold text-gray-900">Settings</h2>
                        </div>
                        <div class="flex-1 p-4 space-y-4">
                            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                                <div class="flex items-center space-x-4">
                                    <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                        <span class="text-white text-xl font-bold" id="settings-avatar">U</span>
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-bold" id="settings-name">User Name</h3>
                                        <p class="text-indigo-100" id="settings-email">user@example.com</p>
                                        <div class="flex items-center space-x-2 mt-1">
                                            <div class="w-2 h-2 rounded-full bg-green-400"></div>
                                            <span class="text-sm text-indigo-100">Online</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-3">
                                <div class="bg-gray-50 rounded-2xl p-4">
                                    <h4 class="font-semibold text-gray-900 mb-3">Notifications</h4>
                                    <div class="space-y-3">
                                        <div class="flex items-center justify-between">
                                            <span class="text-gray-700">Enable Notifications</span>
                                            <label class="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" class="sr-only peer" checked>
                                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </label>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <span class="text-gray-700">Sound</span>
                                            <label class="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" class="sr-only peer" checked>
                                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Chat Window -->
                <div class="flex-1 flex flex-col bg-white">
                    <!-- No Chat Selected -->
                    <div id="no-chat-selected" class="flex items-center justify-center h-full bg-gray-50">
                        <div class="text-center">
                            <div class="bg-indigo-100 p-4 rounded-full inline-block mb-4">
                                <i class="fas fa-comments text-indigo-600 text-4xl"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                            <p class="text-gray-600">Choose a chat to start messaging securely</p>
                        </div>
                    </div>

                    <!-- Active Chat -->
                    <div id="active-chat" class="hidden h-full flex flex-col">
                        <!-- Chat Header -->
                        <div class="p-4 border-b border-gray-200 bg-white">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <span class="text-white font-semibold text-sm" id="chat-avatar">U</span>
                                    </div>
                                    <div>
                                        <h3 class="font-semibold text-gray-900" id="chat-name">User Name</h3>
                                        <p class="text-sm text-gray-500" id="chat-status">Online</p>
                                    </div>
                                </div>
                                
                                <div class="flex items-center space-x-2">
                                    <button id="voice-call-btn" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                        <i class="fas fa-phone text-gray-600"></i>
                                    </button>
                                    <button id="video-call-btn" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                        <i class="fas fa-video text-gray-600"></i>
                                    </button>
                                    <button class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                        <i class="fas fa-ellipsis-h text-gray-600"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Messages -->
                        <div id="messages-container" class="flex-1 overflow-y-auto p-4 bg-gray-50">
                            <!-- Messages will be populated here -->
                        </div>

                        <!-- Message Input -->
                        <div class="p-4 bg-white border-t border-gray-200">
                            <div class="flex items-end space-x-2">
                                <div class="flex items-center space-x-2">
                                    <button id="attachment-btn" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                        <i class="fas fa-paperclip"></i>
                                    </button>
                                    <button id="emoji-btn" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                        <i class="fas fa-smile"></i>
                                    </button>
                                </div>
                                
                                <div class="flex-1 relative">
                                    <textarea id="message-input" placeholder="Type a message..." 
                                              class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                              rows="1"></textarea>
                                </div>
                                
                                <button id="send-btn" class="bg-indigo-500 text-white p-3 rounded-full hover:bg-indigo-600 transition-colors">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                                <button id="voice-record-btn" class="bg-gray-200 text-gray-600 p-3 rounded-full hover:bg-gray-300 transition-colors">
                                    <i class="fas fa-microphone"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <!-- Security Indicator -->
        <div id="security-indicator" class="hidden fixed bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 z-40">
            <i class="fas fa-lock"></i>
            <span>E2E Encrypted</span>
        </div>
    </div>

    <!-- Modals -->
    <!-- New Chat Modal -->
    <div id="new-chat-modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl w-full max-w-md">
            <div class="p-6 border-b border-gray-200">
                <div class="flex justify-between items-center">
                    <h2 class="text-xl font-bold text-gray-900">New Chat</h2>
                    <button id="close-new-chat-modal" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <div class="space-y-4">
                    <button class="w-full flex items-center space-x-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-2xl transition-colors">
                        <div class="bg-indigo-500 p-2 rounded-full">
                            <i class="fas fa-comments text-white"></i>
                        </div>
                        <div class="text-left">
                            <div class="font-medium text-gray-900">New Direct Chat</div>
                            <div class="text-sm text-gray-600">Start a private conversation</div>
                        </div>
                    </button>
                    
                    <button class="w-full flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-colors">
                        <div class="bg-purple-500 p-2 rounded-full">
                            <i class="fas fa-users text-white"></i>
                        </div>
                        <div class="text-left">
                            <div class="font-medium text-gray-900">New Group</div>
                            <div class="text-sm text-gray-600">Create a group chat</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
    <script src="assets/js/encryption.js"></script>
    <script src="assets/js/chat.js"></script>
    <script src="assets/js/auth.js"></script>
    <script src="assets/js/app.js"></script>
</body>
</html>